use std::fmt;
use uuid::Uuid;

use crate::paper::frame::Frame;

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub uuid: Uuid,
    pub name: String,
    pub frames: Vec<Frame>,
}

impl fmt::Display for User {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name)
    }
}

impl User {
    pub fn new() -> User {
        let uuid = Uuid::new_v4();

        User {
            uuid: uuid,
            frames: vec![],
            name: String::from("anonymous"),
        }
    }
}
