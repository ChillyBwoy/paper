use std::fmt;
use uuid::Uuid;

use crate::paper::frame::Frame;

pub enum Action {
    CreateUser,
    AddFrameForUser(Uuid),
}

impl fmt::Display for Action {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Action::AddFrameForUser(_) => write!(f, "addFrameForUser"),
            Action::CreateUser => write!(f, "createUser"),
        }
    }
}

pub(crate) struct Store {}

impl Store {
    pub fn dispatch(&mut self, action: Action) {}
}
