$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) == name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
      // Only send the token to relative URLs i.e. locally.
      xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    }
  },
});

function getPageInfo() {
  const searchParams = new URLSearchParams(window.location.search);

  page = parseInt(searchParams.get("page"));
  if (!page) page = 1;
  page_size = parseInt(searchParams.get("page_size"));
  if (!page_size) page_size = 10;

  return { page: parseInt(page), page_size: parseInt(page_size) };
}

function validation(obj, fields) {
  let msg = "";
  for (let i = 0; i < fields.length; i++) {
    if (!obj[fields[i]]) {
      msg += `<div>${fields[i]} IS REQUIRED.</div>`;
      continue;
    }
    if (fields[i] === "EMAIL") {
      var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(obj["EMAIL"])) {
        msg += `<div>INVALID EMAIL ADDRESS.</div>`;
      }
    }
  }
  return msg;
}

function handleNext() {
  const pageInfo = getPageInfo();
  history.pushState(
    {},
    "",
    `/home/?page=${pageInfo.page + 1}&page_size=${pageInfo.page_size}`
  );

  getUsersList();
}

function handlePrev() {
  const pageInfo = getPageInfo();
  if (pageInfo.page === 1) {
    return;
  }
  history.pushState(
    {},
    "",
    `/home/?page=${pageInfo.page - 1}&page_size=${pageInfo.page_size}`
  );

  getUsersList();
}

function handlePage(page) {
  const pageInfo = getPageInfo();
  history.pushState(
    {},
    "",
    `/home/?page=${page}&page_size=${pageInfo.page_size}`
  );

  getUsersList();
}

function getErrorMsg(data) {
  let msg = "";
  for (let i = 0; i < Object.values(data).length; i++) {
    msg += `<div>${Object.values(data)[i]}</div>`;
  }
  return msg;
}

$(document).ready(function () {
  // your code here
  getUsersList();
  let status = "Not Selected";
  let page, page_size;
  $("#post-content").hide();
  $("#get-content").hide();
  $("#btn-get").click(function () {
    $("#get-content").show();
    $("#post-content").hide();
    status = "GET";
    $("#status").html("GET METHOD SELECTED");
  });
  $("#btn-post").click(function () {
    $("#get-content").hide();
    $("#post-content").show();
    status = "POST";
    $("#status").html("POST METHOD SELECTED");
  });
  $("#btn-put").click(function () {
    $("#get-content").show();
    $("#post-content").show();
    status = "PUT";
    $("#status").html("PUT METHOD SELECTED");
  });
  $("#btn-delete").click(function () {
    $("#get-content").show();
    $("#post-content").hide();
    status = "DELETE";
    $("#status").html("DELETE METHOD SELECTED");
  });

  $("#btn-submit").click(function () {
    $("#input-response").html("Loading...");

    values = {
      USERID: $("#userid").val(),
      USERNAME: $("#username").val(),
      EMAIL: $("#email").val(),
      FIRSTNAME: $("#firstname").val(),
      LASTNAME: $("#lastname").val(),
    };

    if (status === "GET") {
      msg = validation(values, ["USERID"]);
      if (msg) {
        $("#input-response").html(msg);
        return;
      }

      $.ajax({
        url: `/api/users/${parseInt(values.USERID)}/`,
        type: "GET",
        data: {},
        success: function (data) {
          $("#input-response").html("");
          var tree = jsonTree.create(
            data,
            document.getElementById("input-response")
          );

          // tree.expand(function (node) {
          //   return node.childNodes.length < 2;
          // });
        },
        error: function (data) {
          $("#input-response").html(data.responseJSON.detail);
        },
      });
    } else if (status === "POST") {
      let msg = validation(values, [
        "USERNAME",
        "EMAIL",
        "FIRSTNAME",
        "LASTNAME",
      ]);
      if (msg) {
        $("#input-response").html(msg);
        return;
      }

      $.ajax({
        url: "/api/users/",
        type: "POST",
        data: {
          username: values.USERNAME,
          email: values.EMAIL,
          first_name: values.FIRSTNAME,
          last_name: values.LASTNAME,
        },
        success: function (data) {
          $("#input-response").html("");
          var tree = jsonTree.create(
            data,
            document.getElementById("input-response")
          );

          getUsersList();
        },
        error: function (data) {
          msg = getErrorMsg(data.responseJSON);
          $("#input-response").html(msg);
        },
      });
    } else if (status === "PUT") {
      let msg = validation(values, [
        "USERID",
        "USERNAME",
        "EMAIL",
        "FIRSTNAME",
        "LASTNAME",
      ]);
      if (msg) {
        $("#input-response").html(msg);
        return;
      }

      $.ajax({
        url: `/api/users/${values.USERID}/`,
        type: "PUT",
        data: {
          username: values.USERNAME,
          email: values.EMAIL,
          first_name: values.FIRSTNAME,
          last_name: values.LASTNAME,
        },
        success: function (data) {
          $("#input-response").html("");
          var tree = jsonTree.create(
            data,
            document.getElementById("input-response")
          );

          getUsersList();
        },
        error: function (data) {
          $("#input-response").html(data.responseJSON.detail);
        },
      });
    } else if (status === "DELETE") {
      let msg = validation(values, ["USERID"]);
      if (msg) {
        $("#input-response").html(msg);
        return;
      }

      $.ajax({
        url: `/api/users/${values.USERID}/`,
        type: "DELETE",
        data: {},
        success: function (data) {
          $("#input-response").html("Successfully deleted.");
          getUsersList();
          // var tree = jsonTree.create(
          //   data,
          //   document.getElementById("input-response")
          // );
          // handle the returned data here
        },
        error: function (data) {
          $("#input-response").html(data.responseJSON.detail);
        },
      });
    }
  });
});

function getUsersList() {
  console.log("error", getPageInfo());
  pageInfo = getPageInfo();

  // history.pushState({}, "", `/home/?page=${page}&page_size=${page_size}`);
  $("tbody").html(`
    <tr>
      <td colspan="5" class="text-center">Loading...</td>
    </tr>`);
  $.ajax({
    url: `/api/users/?page=${pageInfo.page}&page_size=${pageInfo.page_size}`,
    // data: {
    //   page: searchParams.get("page"),
    //   page_size: searchParams.get("page_size"),
    // },
    success: function (data) {
      console.log(data);
      // handle the returned data here
      if (data.length === 0) {
        $("tbody").html(`<tr>
            <td colspan="5" class="text-center">No Users</td>
          </tr>`);
        return;
      }
      dataHtml = "";
      for (let i = 0; i < data.results.length; i++) {
        dataHtml += `<tr>
        <td>${data.results[i].id}</td>
        <td>${data.results[i].username}</td>
        <td>${data.results[i].email}</td>
        <td>${data.results[i].first_name}</td>
        <td>${data.results[i].last_name}</td>
      </tr>`;
      }
      $("tbody").html(dataHtml);

      $(".page-btn").empty();

      total_page = parseInt((data.count - 1) / pageInfo.page_size) + 1;
      paginationHtml = `      <li class="page-item prev">
      <button class="page-link ${
        pageInfo.page == 0 && "disabled"
      }" aria-label="Previous" id="btn-prev" onclick="handlePrev()">
        <span aria-hidden="true">&laquo;</span>
      </button>
    </li>`;
      for (i = 1; i <= total_page; i++) {
        paginationHtml += `<li class="page-item page-btn ${
          i == pageInfo.page && "active"
        }"><button class="page-link" onclick="handlePage(${i})">${i}</button></li>`;
      }
      paginationHtml += `<li class="page-item">
      <button class="page-link ${
        pageInfo.page == total_page && "disabled"
      }" aria-label="Next" id="btn-next" onclick="handleNext()">
        <span aria-hidden="true">&raquo;</span>
      </button>
    </li>`;
      $(".pagination").html(paginationHtml);
    },
    error: function (data) {
      console.log(data.responseJSON);
      $("tbody").html(`<tr>
      <td colspan="5" class="text-center">${data.responseJSON.detail}</td>
    </tr>`);
    },
  });
}
