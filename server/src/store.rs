use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

use futures::future;
use futures::prelude::Future;
use uuid::Uuid;

use crate::paper::user::User;

pub enum Cmd<Msg> {
    None,
    Cmd(Box<Future<Item = Msg, Error = ()>>),
}

impl<Msg: 'static> Cmd<Msg> {
    pub fn new<F>(f: F) -> Cmd<Msg>
    where
        F: FnOnce() -> Msg + 'static,
    {
        Cmd::Cmd(Box::new(future::lazy(|| Ok(f()))))
    }
}

pub enum Msg {
    None,
    CreateUser,
    // AddFrameForUser(Uuid),
}

type Users = Rc<RefCell<HashMap<Uuid, User>>>;

pub struct Model {
    users: Users,
}

pub fn update(model: Model, msg: Msg) -> (Model, Cmd<Msg>) {
    match msg {
        Msg::CreateUser => {
            // let user = User::new();
            // self.users.borrow_mut().insert(user.uuid, user);
            (model, Cmd::None)
        }
        Msg::None => (model, Cmd::None),
    }
}

// impl fmt::Display for Action {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         match self {
//             Action::AddFrameForUser(_) => write!(f, "addFrameForUser"),
//             Action::CreateUser => write!(f, "createUser"),
//         }
//     }
// }
