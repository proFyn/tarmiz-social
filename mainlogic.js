function setupUI(){
            const token =localStorage.getItem("token")
            const registerBt= document.getElementById("register-bt")
            const loginBt= document.getElementById("login-bt")
            const logoutBt= document.getElementById("logout-bt")
            const pfp = document.getElementById("pfp")
            const username = document.getElementById("U")
            const user = localStorage.getItem("user")
            const userData = user ? JSON.parse(user) : null;
            const newPost = document.getElementById("new-post")
            const addComment = document.querySelector(".add-comment")
            if (userData) {
                pfp.src = userData.profile_image
                pfp.onerror="this.onerror=null; this.src='./pictures/535da424-9bc7-47e6-aff2-47027fcfb09c.jpg';"
                username.innerText = userData.username;
            }
            if (token == null) {
                logoutBt.style.display = "none"
                pfp.style.display = "none"
                username.style.display = "none"
                loginBt.style.display = "block"
                registerBt.style.display = "block"
                addComment.style.display = "none"
            } else {
                loginBt.style.display = "none"
                registerBt.style.display = "none"
                logoutBt.style.display = "block"
                pfp.style.display = "block"
                addComment.style.display = "block"
            }
        }
//--------------------------------

function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        showsuccessalert("Logout successful")
        setupUI()
        location.reload()
      }

//-----------------------------
async function Register(){
              toggleloader(true)
        const profile_image = document.getElementById("profile-picture");
        const username = document.getElementById("Rusername").value
        const name = document.getElementById("Rname").value
        const email = document.getElementById("Remail").value
        const password = document.getElementById("Rpassword").value
        const image = profile_image.files[0]
        const formData = new FormData();
        formData.append("username", username); 
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);
           try {

              const response = await fetch("https://tarmeezacademy.com/api/v1/register",{	  
                  method: 'POST',
                  body: formData 
                });
                const data = await response.json();
                  if (!response.ok) {
                  throw new Error(data.message);
                      }    
              console.log(data)
              localStorage.setItem("token",data.token)
              localStorage.setItem("user",JSON.stringify(data.user))
              const modal = document.getElementById("registerModal")
                          const modelins = bootstrap.Modal.getInstance(modal)
                          modelins.hide()
                         showsuccessalert("Registration successful")
                         setupUI()
           }catch(e){
            alert("error try again")
           }
           toggleloader(false)
          }
//-----------------------------

            async function Login(){
              toggleloader(true)
              const username = document.getElementById("Lusername").value
              const password = document.getElementById("Lpassword").value
            try {
              const response = await fetch("https://tarmeezacademy.com/api/v1/login",{	  
                  method: 'POST',
                  body: JSON.stringify({
                    "username" : username,
                    "password" : password
                  }),
                  headers: {
                    'Content-type': 'application/json',
                  },
                });

                const data = await response.json();
                localStorage.setItem("token",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                      const model = document.getElementById("LoginModal")
                      const modelins = bootstrap.Modal.getInstance(model)
                      modelins.hide()
                      showsuccessalert("Login successful")
                setupUI()
            } catch (error) {
              alert("login failed")
            }
            toggleloader(false)
            }


 // --------------------------------------------
        function showsuccessalert(message) {
                  const alertBox = document.getElementById("login-alert");
                  alertBox.querySelector(".alert.alert-success.d-flex.align-items-center").innerText = message;
                  alertBox.style.display = "block";
                  setTimeout(() => {
                    alertBox.style.display = "none";
                  }, 2000);
                }

// --------------------------------------------

async function details(id) {
    // Get postId from localStorage or use the passed id
    toggleloader(true)
    try {
        const response = await fetch(`https://tarmeezacademy.com/api/v1/posts/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const post = data.data; 
        postUser = document.getElementById("postUser");
        postUser.innerText = post.author.username +"'s post";
        localStorage.setItem("postId", id);
        console.log(post);
        let tags =""
        if (post.tags && post.tags.length > 0){
          for (let i of post.tags){
            tags+=`<span class="badge bg-secondary" style="margin-left:3px">${i.name}</span>`
          }}
        const con = document.getElementById("posts2");
        con.innerHTML = `
    <div class="card" style="background-color: #1e293b;padding-top: 10px;margin-bottom:20px;">
         <div class="card-header" style="border-bottom: none">
            <img src="${post.author.profile_image}" alt="" style="height: 40px;width: 40px;border-radius: 50%;margin-bottom: -8px;" onerror="this.onerror=null; this.src='./pictures/535da424-9bc7-47e6-aff2-47027fcfb09c.jpg';">
            <span style="color: #fff; opacity: 0.9; margin-left: 7.5px;">
                    ${post.author.username}
             <p style="color:white;margin-left: 50px;opacity: 0.5;margin-top: -8px;" >${post.created_at}</p>
              </span>
                    </div>
                    <div class="card-body">
                        <img src="${post.image}" alt="" style="height: 300px;width: 100%;border-radius: 10px;margin-bottom: 10px; margin-top: -20px;" onerror="this.onerror=null; this.src='./pictures/ChatGPT Image Aug 25, 2025, 10_52_25 AM.png';">
                        <h5 class="card-title" style="color: #fff;">${post.title}</h5>
                        <p class="card-text" style="color: #fff;opacity: 0.8;margin-left: 10px;line-height: 1.4;">${post.body}</p>
                        <div style="padding-left: 10px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16"style="color:white">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                            </svg>
                            <span style="color: #fff;opacity: 0.5;margin-left: 5px;" >(${post.comments_count}) comments</span>
                            ${tags} 
                            </div>
                            <div class="comments">       
                        </div>
                    </div>
                    </div>
                   </div>
`
        let comments = document.querySelector(".comments");
        
        for (i of post.comments){
           let comment =` <div class="comment">
                                <hr style="height: 1px; color: rgb(255, 255, 255);">
                                <div class="com-content" style=" margin: 10px 0;">
                                     <img src="${i.author.profile_image}" alt="" style="height: 40px;width: 40px;border-radius: 50%;" onerror="this.onerror=null; this.src='./pictures/535da424-9bc7-47e6-aff2-47027fcfb09c.jpg';">
                                        <span style="color: #fff; opacity: 0.9; margin-left: 5px; padding-top: px; ">
                                                ${i.author.username}
                                        </span>
                                        <p style="color: #fff; display: block;opacity: 0.7;margin: 5px;padding: 5px;">${i.body}</p>
                                </div>
                            </div>`
          comments.innerHTML+=comment
        }
        let addcomment = document.createElement("div");
        addcomment.className = "add-comment";
        addcomment.style.display = "none";
        addcomment.innerHTML = `
        <hr style="height: 1px; color: rgb(255, 255, 255);">
            <div class="input-group mb-3" style="margin-top: 30px;">
                <input type="text" class="form-control" placeholder="Add a comment..." id="comment-input" style="background-color: #ffffffc6; ">
                <button class="btn " id="add-comment-btn" style="background-color:#f97316;color:white" onclick="addComment()">Send</button>
            </div>`;
        comments.appendChild(addcomment);

        setupUI()
      }
    catch (error) {
        console.error("Error fetching post details:", error);
        alert("Error fetching post details");
    }
    toggleloader(false)
  }
// --------------------------------------------
function addComment() {
    const commentInput = document.getElementById("comment-input");
    const commentBody = commentInput.value.trim();
    if (commentBody === "") {
      alert("Comment cannot be empty");
      return;
    }
    toggleloader(true)
    const postId = localStorage.getItem("postId");
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to comment");
        return;
    }
    fetch(`https://tarmeezacademy.com/api/v1/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ body: commentBody })
    })
    .then(response => response.json())
    .then(data => {
            showsuccessalert("Comment added successfully");
            details(postId); // Refresh the post details to show the new comment
            commentInput.value = ""; // Clear the input field

       
    })
    .catch(error => {
        console.error("Error adding comment:", error);
        alert(error.message || "Error adding comment");
    }
    
  );
  toggleloader(false)
}



function toggleloader(show=true){
  const loader = document.getElementById("loader")
  if(show){
    loader.style.display="flex"
  }else{    
    loader.style.display="none"
  }
}


// ---------------------------------
let id = localStorage.getItem("postId"); 
details(id)
setupUI()