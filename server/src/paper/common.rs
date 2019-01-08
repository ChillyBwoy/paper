pub trait Encodable {
    fn encode(&self) -> Vec<i16>;
}

pub enum DrawingTool {
    Brush,
    Pencil,
}
