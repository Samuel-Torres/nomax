export default function convertDateToRelative(dateString: Date): string {
  const currentUtcTime = new Date();
  const postedTime = new Date(dateString);
  const timeDifference = currentUtcTime.getTime() - postedTime.getTime();

  if (timeDifference < 60000) {
    // Less than 1 minute
    return "just now";
  } else if (timeDifference < 3600000) {
    // Less than 1 hour
    const minutes = Math.floor(timeDifference / 60000);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 86400000) {
    // Less than 1 day
    const hours = Math.floor(timeDifference / 3600000);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 604800000) {
    // Less than 1 week
    const days = Math.floor(timeDifference / 86400000);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    const weeks = Math.floor(timeDifference / 604800000);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }
}

// const date = "2023-08-30T16:10:30.562Z";
// const relativeTime = convertDateToRelative(date);
// console.log(relativeTime);
