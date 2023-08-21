using Microsoft.AspNetCore.Mvc;

namespace UploadDtoFiles;

[ApiController]
[Route("test")]
public class TestController : ControllerBase
{
    public TestController()
    {
    }

    [HttpPost, Route("save-and-upload")]
    public IActionResult UploadDtoFile([FromForm] MyDto dto)
    {
        if (dto == null) throw new InvalidOperationException("No dto");
        if (dto.MyFile == null) throw new InvalidOperationException("No file in dto");
        if (string.IsNullOrEmpty(dto.Prop1)) throw new InvalidOperationException("No file in dto");
        return Ok($"Prop 1: {dto.Prop1} Prop 2: {dto.Prop2} File(Name: {dto.MyFile.FileName}, Size: {dto.MyFile.Length}, Type: {dto.MyFile.ContentType})");
    }
}

public class MyDto
{
    public string Prop1 { get; set; } = string.Empty;
    public string? Prop2 { get; set; }
    public IFormFile? MyFile { get; set; }
}