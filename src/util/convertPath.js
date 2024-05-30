export const convertPath = (path, type) => {
  switch (type) {
    case "userPhoto": {
      return path.replace("images\\user-images\\", "").replace(/\\/g, "/");
    }
    case "beatPhoto": {
      return path
        .replace("dev-data\\images\\beat-images\\", "")
        .replace(/\\/g, "/");
    }
    case "track": {
      return path.replace("dev-data\\tracks\\", "").replace(/\\/g, "/");
    }
  }
};
