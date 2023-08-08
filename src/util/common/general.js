//convert image to base64
export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file);
        fileReader.onload = () => { 
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    })
}


  // Recursive function to count comments and nested replies
  function countCommentsAndReplies(item) {
    let count = 1; // Count the current comment or reply itself
    
    if (item.replies && item.replies.length > 0) {
      for (const reply of item.replies) {
        count += countCommentsAndReplies(reply); // Recursively count nested replies
      }
    }
    
    return count;
  }

export const getCommentCounts =(comments) => {
    let totalCount = 0;
    for (const comment of comments) {
      totalCount += countCommentsAndReplies(comment);
    }
    return totalCount
  }

// Random Int for Keys
export const getRandomInt = () => {
  return Math.floor(Math.random() * 500000000000);
}