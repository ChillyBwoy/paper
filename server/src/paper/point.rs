use std::fmt;

use crate::paper::common;

#[derive(Debug)]
pub(crate) struct Point(i32, i32, bool);

impl Point {
    pub fn new() -> Point {
        Point(0, 0, false)
    }
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}:{}", self.0, self.1)
    }
}

impl common::Encodable for Point {
    fn encode(&self) -> Vec<i32> {
        vec![self.0, self.1, self.2 as i32]
    }
}
