

// --------------------------------------------

// ------------------------------------- 
const profileId = localStorage.getItem("profileId") || JSON.parse(localStorage.getItem("user")).id;
 if (profileId === null) {
        location = "index.html"
     }
     const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
     async function getPosts() {
      toggleloader(true)
                  try {
                    const response = await fetch(`https://tarmeezacademy.com/api/v1/users/${profileId}/posts`);
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
          
                    const Posts = document.getElementById("posts")
                    
                    
                    for (let post of data.data){
                      let isMypost = userId ==post.author.id
                  
                      
                      let tags =""
                      let id=post.id
                      if (post.tags && post.tags.length > 0){
                        
                        for (let i of post.tags){
                          tags+=`<span class="badge bg-secondary" style="margin-left:3px">${i.name}</span>`
                        }
                      }
                        if(typeof post.author.profile_image !=='string'){
                            post.author.profile_image='pictures/535da424-9bc7-47e6-aff2-47027fcfb09c.jpg'

                        }
                      const image = post.image || "https://placehold.co/600x400/png"
                        Posts.innerHTML+=`  <div class="card" style="background-color: #1e293b;padding-top: 10px;margin-bottom:20px; " >
                                                <div class="card-header" style="border-bottom: none">
                                                    <img src="${post.author.profile_image}" alt="" style="height: 40px;width: 40px;border-radius: 50%;margin-bottom: -8px;"onerror="this.onerror=null; this.src='./pictures/535da424-9bc7-47e6-aff2-47027fcfb09c.jpg';">
                                                      ${ isMypost? `<button type="button" class="btn btn-danger" style="float:right; margin-left:5px; cursor:pointer" onclick="deletePost(\`${encodeURIComponent(JSON.stringify(post))}\`)">delete </button>`  : "" }
                                                      ${ isMypost? `<button type="button" class="btn btn-secondary" style="float:right; margin-left:5px; cursor:pointer" onclick="editPost(\`${encodeURIComponent(JSON.stringify(post))}\`)">edit </button>`  : "" }
                                                    <span style="color: #fff; opacity: 0.9; margin-left: 7.5px;">
                                                            ${post.author.username}
                                                            <p style="color:white;margin-left: 50px;opacity: 0.5;margin-top: -8px;" >${post.created_at}</p>
                                                    </span>
                                                </div>
                                                <div class="card-body" onclick="goToDetails(${post.id})" style="cursor: pointer;">
                                                    <img src="${image}" alt="" style="height: 300px;width: 100%;border-radius: 10px;margin-bottom: 10px; margin-top: -20px; " onerror="this.onerror=null; this.src='./pictures/ChatGPT Image Aug 25, 2025, 10_52_25 AM.png';">
                                                    <h5 class="card-title" style="color: #fff;">${post.title}</h5>
                                                    <p class="card-text" style="color: #fff;opacity: 0.8;margin-left: 10px;line-height: 1.4;">${post.body}</p>
                                                    <div style="padding-left: 10px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16"style="color:white">
                                                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                                        </svg>
                                                        <span style="color: #fff;opacity: 0.5;margin-left: 5px;" >(${post.comments_count}) comments</span>
                                                        ${tags} 
                                                        
                                                        </div>
                                                </div>
                                        </div>`
                              

                    }

                  } catch (error) {
                    console.error("Error fetching posts:", error);
                    
                  }
                  toggleloader(false)
                }
// ---------------------------------------------------------------------------
      async function setupUI(){
        toggleloader(true)
            const token =localStorage.getItem("token")
            const logoutBt= document.getElementById("logout-bt")
            const pfp = document.getElementById("pfp")
            const username = document.getElementById("U")
            const pfp2 = document.getElementById("pfp2")  
            const userData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
            const response = await fetch(`https://tarmeezacademy.com/api/v1/users/${profileId}`)
            const data = await response.json()
            toggleloader(false)
            const userfData = data.data
            document.getElementById("userpic").innerText = userfData ? userfData.username : "User"
            document.getElementById("usernamepost").innerText = userfData ? userfData.username + " Posts" : "User"
            document.getElementById("postnum").innerText = userfData ? userfData.posts_count + " Posts" : "0 posts"
            document.getElementById("commentnum").innerText = userfData ? userfData.comments_count + " comments" : "0 comments"
            pfp2.src = userfData.profile_image 
            pfp2.onerror = function() {
              this.onerror = null;
              this.src = './pictures/535da424-9bc7-47e6-aff2-47027fcfb09c.jpg';
            };
            
            if (userData) {
                pfp.src = userData.profile_image 
                          pfp.onerror = function() {
              this.onerror = null;
              this.src = './pictures/535da424-9bc7-47e6-aff2-47027fcfb09c.jpg';
            };
                


            }
            if (token == null) {
                logoutBt.style.display = "none"
                pfp.style.display = "none"
                username.style.display = "none"
            } else {
                logoutBt.style.display = "block"
                pfp.style.display = "block"
                username.style.display = "block"
            }
        }



// ---------------------------------------------------------------------------

      function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        showsuccessalert("Logout successful")
        setTimeout(() => {
          localStorage.removeItem("profileId")
          setupUI()
         location="index.html"
        }, 500);
      
      }
// -------------------------------------------------------------------------
 // --------------------------------------------
function showsuccessalert(message) {
                  const alertBox = document.getElementById("login-alert");
                  alertBox.querySelector(".alert.alert-success.d-flex.align-items-center").innerText = message;
                  alertBox.style.display = "block";
                  setTimeout(() => {
                    alertBox.style.display = "none";
                  }, 2000);
                }
// -----------------------------------------------

function setupScrollToTopButton() {
            const upButton = document.getElementById('upButton');
            const op = document.getElementById('overcont');
            function toggleButton() {
              if (op.scrollTop > 100) { 
                upButton.style.display = 'block';
              } else {
                upButton.style.display = 'none';
              }
            }
            op.addEventListener('scroll', toggleButton);
            upButton.addEventListener('click', () => {
              op.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            });
            toggleButton();
      }
// -----------------------------------------

function goToDetails(id){
    localStorage.setItem("postId", id);
    window.location = "./details.html";
  }

// -----------------------------------------



function editPost(postobj){
  let post = JSON.parse(decodeURIComponent(postobj));
  console.log(post)
  document.getElementById("post-id").value=post.id
  document.getElementById("postTitle").value=post.title
  document.getElementById("postBody").value=post.body
  document.getElementById("postModalTitle").innerText="edit post"
  document.getElementById("postVal").innerText="update"
  let postModel = new bootstrap.Modal(document.getElementById('addPostModal'),{});
  postModel.toggle();
}
// -------------------------------------------
        async function createNewPost(){
          toggleloader(true)
          let postId = document.getElementById("post-id").value
          let isCreate = postId === "" || postId === null
          console.log(isCreate)
          const body = document.getElementById("postBody").value
          const title = document.getElementById("postTitle").value
          const picture = document.getElementById("postPicture").files[0]
          const token = localStorage.getItem("token")
          const formData = new FormData();
          formData.append("title", title); 
          formData.append("body", body);
          if (picture) {
            formData.append("image", picture);
          }
          let url = isCreate ? "https://tarmeezacademy.com/api/v1/posts" : `https://tarmeezacademy.com/api/v1/posts/${postId}`
          if (!isCreate) {
            formData.append("_method", "put");
          }

                  try {
                    const response = await fetch(url, {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${token}`
                      },
                      body: formData
                    })
                    const data = await response.json()
                    console.log(data)
                    const modal = document.getElementById("addPostModal")
                    if (isCreate) {
                    showsuccessalert("Post created successfully")
                    }else {
                      showsuccessalert("Post updated successfully")
                    }
                    const modalInstance = bootstrap.Modal.getInstance(modal)
                    modalInstance.hide()
                    const Posts = document.getElementById("posts");
                    Posts.innerHTML = "";   
                    currentPage = 1;       
                    getPosts(currentPage);
                    setupUI()
                  } catch (e) {
                    // console.log(e.message)
                    if (isCreate) {
                       alert("Error creating post")
                     } else  {
                  alert("Error editing post")
                  }
                  }
                  toggleloader(false)
                }
// -------------------------------------------
function deletePost(postobj){
  let post = JSON.parse(decodeURIComponent(postobj));
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) {
    return;
  }
  toggleloader(true)
  const token = localStorage.getItem("token")
  fetch(`https://tarmeezacademy.com/api/v1/posts/${post.id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Error deleting post");
    }
    toggleloader(false)
    showsuccessalert("Post deleted successfully")
    const Posts = document.getElementById("posts");
    Posts.innerHTML = "";   
    currentPage = 1;       
    getPosts(currentPage);
    setupUI()
  })
  .catch(error => {
    alert(error.message);
  });
}
function by(){
  localStorage.removeItem("profileId")
  location="index.html"
}
function toggleloader(show=true){
  const loader = document.getElementById("loader")
  if(show){
    loader.style.display="flex"
  }else{    
    loader.style.display="none"
  }
}
setupUI()
setupScrollToTopButton()
getPosts()
