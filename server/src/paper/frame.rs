extern crate chrono;

use chrono::{DateTime, Utc};

use crate::paper::drawing_tool::Brush;
use crate::paper::point::Point;

#[derive(Debug)]
pub(crate) struct Frame {
    pub created_at: DateTime<Utc>,
    pub points: Vec<Point>,
    pub brush: Brush,
}

impl Frame {
    pub fn new() -> Frame {
        Frame {
            brush: Brush::new(),
            created_at: Utc::now(),
            points: vec![],
        }
    }
}
