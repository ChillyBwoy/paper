use crate::paper::common;

#[derive(Serialize, Deserialize, Debug)]
pub struct Point(i16, i16);

impl Point {
    pub fn new() -> Point {
        Point(0, 0)
    }
}

impl common::Encodable for Point {
    fn encode(&self) -> Vec<i16> {
        vec![self.0, self.1]
    }
}
