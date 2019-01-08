extern crate chrono;

// use chrono::{DateTime, Utc};

use crate::paper::point::Point;

#[derive(Serialize, Deserialize, Debug)]
pub(crate) struct Palette {
    pub name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub(crate) struct Frame {
    // pub created_at: DateTime<Utc>,
    pub points: Vec<Point>,
    pub drawing_tool: String,
    pub palettes: Vec<Palette>,
}

impl Frame {
    pub fn new() -> Frame {
        Frame {
            drawing_tool: String::from("brush"),
            palettes: vec![],
            // created_at: Utc::now(),
            points: vec![],
        }
    }
}
