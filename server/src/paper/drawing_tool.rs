#[derive(Debug)]
pub(crate) struct Brush {
    pub stroke_style: (i8, i8, i8),
    pub stroke_opacity: f32,
    pub line_width: i8,
}

impl Brush {
    pub fn new() -> Brush {
        Brush {
            stroke_style: (0, 0, 0),
            stroke_opacity: 1.0,
            line_width: 3,
        }
    }
}
