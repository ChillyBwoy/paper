extern crate ws;

use std::cell::RefCell;
use std::collections::HashMap;
use std::fmt;
use std::rc::Rc;

use uuid::Uuid;

use ws::{listen, CloseCode, Error, Handler, Handshake, Message, Result, Sender};

const SERVER_ADDRESS: &str = "127.0.0.1:3012";

struct Client {
    uuid: Uuid,
    name: String,
}

impl fmt::Display for Client {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}<{}>", self.uuid, self.name)
    }
}

type Clients = Rc<RefCell<HashMap<String, Client>>>;

struct Server {
    out: Sender,
    clients: Clients,
}

impl Handler for Server {
    fn on_open(&mut self, _: Handshake) -> Result<()> {
        let uuid = Uuid::new_v4();
        let name = String::from("Unknown");
        let client = Client {
            uuid: uuid,
            name: name,
        };

        self.clients.borrow_mut().insert(uuid.to_string(), client);
        self.out.send(Message::text(uuid.to_string()))
    }

    fn on_message(&mut self, msg: Message) -> Result<()> {
        self.out.broadcast(msg)
    }

    fn on_close(&mut self, code: CloseCode, reason: &str) {
        match code {
            CloseCode::Normal => println!("The client is done with the connection."),
            CloseCode::Away => println!("The client is leaving the site."),
            CloseCode::Abnormal => {
                println!("Closing handshake failed! Unable to obtain closing status from client.")
            }
            _ => println!("The client encountered an error: {}", reason),
        }
    }

    fn on_error(&mut self, err: Error) {
        println!("The server encountered an error: {:?}", err);
    }
}

fn main() {
    let clients = Clients::new(RefCell::new(HashMap::new()));

    listen(SERVER_ADDRESS, |out| Server {
        out: out,
        clients: clients.clone(),
    })
    .unwrap()
}
