function display()
{
    $.ajax({
        url : "https://jsonplaceholder.typicode.com/posts/1/comments",
        method : "GET",
        datatype: "json",
        success: handel,
        error: function(error){
            console.log("Error in fetching APIs");
        }
    });
}

function handel(data)
{
    var datalist = $("#displayStories")
    datalist.empty();
    $.each(data , function(index, res){
        datalist.append(
            `<div class="card my-3 mx-3 commonColor" style="width:400px">
            <div class="card-body">
            <h4 class="card-title">${res.name}</h4>
            <p class="card-text">ID : ${res.id}</p>
            <p class="card-text">Email : ${res.email}</p>
            <p class="card-text">${res.body}</p>
            <a href="#" class="btn btn-primary update" data-id="${res.id}">Update</a>
            <a href="#" class="btn btn-danger delete" data-id="${res.id}">Delete</a>
            </div>
        </div>`
        );
    });
    console.log("Data fetched");
}



function AddNewData(event)
{
    event.preventDefault();

    let dataid = $("#Add").attr("data-id");
    var name = $("#name").val();
    var id = $("#ID").val();
    var email = $("#email").val();
    var description = $("#description").val();

    $.ajax({
        url : "https://jsonplaceholder.typicode.com/posts/1/comments",
        method : "POST",
        data: {id,name,email,description},
        success: function(){
            console.log("Im here 3");
            display();
        },
        error: function(error){
            console.log("Creation of Data Error", error);
        },
    });

    // if(dataid)
    // {
    //     $.ajax({
    //         url : "https://jsonplaceholder.typicode.com/posts/1/comments" + dataid,
    //         method : "PUT",
    //         data: {id,name,email,description},
    //         success: function(){
    //             console.log("Im here");
    //             display();
    //         },
    //         error: function(error){
    //             console.log("Creation of Data Error", error);
    //         },
    //     });
    // }
    // else
    // {
        
    // } 
}


function editBtnClicked(event) {
    event.preventDefault();
    let storyId = $(this).attr("data-id");
    $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts/1/comments" + storyId,
    method: "GET",
    success: function (data) {
    console.log(data);
    $("#clear").show();
    $("#createTitle").val(data.title);
    $("#createContent").val(data.content);
    $("#createBtn").html("Update");
    $("#createBtn").attr("data-id", data.id);
    },
    error: function (error) {
    console.error("Error deleting story:", error);
    },
});
}


$(document).ready(function()
{
    display();

    $("#FormData").submit(AddNewData);

    $(document).on("click", ".update", editBtnClicked);
});