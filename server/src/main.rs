#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;

extern crate docopt;

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

use uuid::Uuid;

use docopt::Docopt;

use ws::{listen, CloseCode, Error, Handler, Handshake, Message, Sender};

mod paper;
mod store;

use crate::paper::user::User;
use crate::store::Action;

type Users = Rc<RefCell<HashMap<Uuid, User>>>;

struct Server {
    out: Sender,
    users: Users,
}

impl Handler for Server {
    fn on_open(&mut self, _: Handshake) -> ws::Result<()> {
        let user = User::new();
        // self.users.borrow_mut().insert(user.uuid, user);

        let payload = (String::from("init"), user);
        let response = serde_json::to_string(&payload).unwrap();

        self.out.send(Message::text(response))
    }

    fn on_message(&mut self, msg: Message) -> ws::Result<()> {
        println!("Data recieved: {}", msg);
        self.out.broadcast(msg)
    }

    fn on_close(&mut self, code: CloseCode, reason: &str) {
        match code {
            CloseCode::Normal => println!("The client is done with the connection."),
            CloseCode::Away => println!("The client is leaving the site."),
            CloseCode::Abnormal => {
                println!("Closing handshake failed! Unable to obtain closing status from client.")
            }
            _ => println!("Error: {}", reason),
        }
    }

    fn on_error(&mut self, err: Error) {
        println!("The server encountered an error: {:?}", err);
    }
}

const USAGE: &'static str = "
Paper websocket server

Usage:
  paper (-h | --help)
  paper start [--host=<host> --port=<port>]

Options:
  -h, --help     Show this screen.
  --host=<host>  Specify address [default: 127.0.0.1].
  --port=<port>  Specify port [default: 3012].
";

#[derive(Debug, Deserialize)]
struct Args {
    flag_port: String,
    flag_host: String,
}

fn main() {
    let users = Users::new(RefCell::new(HashMap::new()));
    let args: Args = Docopt::new(USAGE)
        .and_then(|d| d.deserialize())
        .unwrap_or_else(|e| e.exit());

    let server_addr = format!("{}:{}", args.flag_host, args.flag_port);

    println!("Starting ws server: {}", server_addr);

    listen(server_addr, |out| Server {
        out: out,
        users: users.clone(),
    })
    .unwrap()
}
