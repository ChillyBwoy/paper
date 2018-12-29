#[derive(Debug)]
pub(crate) struct Brush {
    pub stroke_style: String,
    pub line_width: i32,
}

impl Brush {
    pub fn new() -> Brush {
        Brush {
            stroke_style: String::from("#333333"),
            line_width: 3,
        }
    }
}
