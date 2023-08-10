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


// Time Difference

export const timeDifference = (inputDate) => {
  const currentDate = new Date();

  const parsedDate = new Date(inputDate);
  const timeDifference = currentDate - parsedDate; // Difference in milliseconds

  const msInSecond = 1000;
  const msInMinute = 60 * msInSecond;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;
  const msInWeek = 7 * msInDay;
  const msInMonth = 30 * msInDay;
  const msInYear = 365 * msInDay;

  if (timeDifference >= msInYear) {
    const years = Math.floor(timeDifference / msInYear);
    return (`${years} yr(s) ago`);
  } else if (timeDifference >= msInMonth) {
    const months = Math.floor(timeDifference / msInMonth);
    return (`${months} mth(s) ago`);
  } else if (timeDifference >= msInWeek) {
    const weeks = Math.floor(timeDifference / msInWeek);
    return (`${weeks} wk(s) ago`);
  } else if (timeDifference >= msInDay) {
    const days = Math.floor(timeDifference / msInDay);
    return (`${days} day(s) ago`);
  } else if (timeDifference >= msInHour) {
    const hours = Math.floor(timeDifference / msInHour);
    return (`${hours} hr(s) ago`);
  } else if (timeDifference >= msInMinute) {
    const minutes = Math.floor(timeDifference / msInMinute);
    return (`${minutes} min(s) ago`);
  } else {
    const seconds = Math.floor(timeDifference / msInSecond);
    return (`${seconds} secs ago`);
  }
}