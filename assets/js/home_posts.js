{
    // Method to submit the new form data using AJAX -> route is not required
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){                        // e is the event
            e.preventDefault();                                // To stop the normal request

            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),              // Converts data into JSON
                success : function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error : function(err){
                    console.log(err.responseText);
                }
            })
        });
    }

    // Method to create a post in DOM

    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post.id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }


    createPost();
}