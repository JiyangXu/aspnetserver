using aspnetserver.Data;
using aspnetserver.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
        });
});


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
    {
        swaggerGenOptions.SwaggerDoc("v1",new OpenApiInfo{Title = "ASP.NET React", Version="v1"});
    }
    );

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "ASP.NET React";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json","Web API serving a very simply Post model.");
    swaggerUIOptions.RoutePrefix = string.Empty;
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

PostsRepository _postsRepository=new PostsRepository();

app.MapGet("/get-all-posts", async () => await _postsRepository.GetPostsAsync())
    .WithTags("Posts Endpoints");

app.MapGet("/get-post-by-id/{postId}", async (Guid postId) =>
{
    
    Post postToReturn = await _postsRepository.GetPostByIdAsync(postId);

    if (postToReturn != null)
    {
        return Results.Ok(postToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

app.MapPost("/create-post", async (Post postToCreate) =>
{

    bool createSuccessful = await _postsRepository.CreatePostAsync(postToCreate);

    if (createSuccessful != null)
    {
        return Results.Ok("Create Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

app.MapPost("/update-post", async (Post postToUpdate) =>
{

    bool updateSuccessful = await _postsRepository.UpdatePostAsync(postToUpdate);

    if (updateSuccessful != null)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

app.MapDelete("/delete-post-by-id/{postId}", async (Guid postId) =>
{

    bool deleteSuccessful = await _postsRepository.DeletePostAsync(postId);

    if (deleteSuccessful != null)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");


app.Run();