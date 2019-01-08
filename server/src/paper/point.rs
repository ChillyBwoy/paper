use std::fmt;

use crate::paper::common;

#[derive(Serialize, Deserialize, Debug)]
pub(crate) struct Point(i16, i16);

impl Point {
    pub fn new() -> Point {
        Point(0, 0)
    }
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}:{}", self.0, self.1)
    }
}

impl common::Encodable for Point {
    fn encode(&self) -> Vec<i16> {
        vec![self.0, self.1]
    }
}
