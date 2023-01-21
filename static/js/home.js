$(document).ready(function () {
  // your code here
  getUsersList();
  $("#btn-get").click(function () {
    console.log("GET");
    $("#input-request").append(`
      <input id='' />
    `);
  });
  $("#btn-post").click(function () {
    console.log("POST");
  });
  $("#btn-put").click(function () {
    console.log("PUT");
  });
  $("#btn-delete").click(function () {
    console.log("DELETE");
  });
});

function getUsersList() {
  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams.get("page"));
  console.log(searchParams.get("page_size"));
  $.ajax({
    url: "/api/users/",
    data: {
      page: searchParams.get("page"),
      page_size: searchParams.get("page_size"),
    },
    success: function (data) {
      console.log(data);
      // handle the returned data here
    },
  });
}
