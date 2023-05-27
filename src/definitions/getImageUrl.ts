import axios from 'axios';

const getImageUrl = async (filename) => {
  const path = `/image/${filename}`;
  try {
    const res = await axios.get(path);
    if (!res.data.startsWith('https')) {
      /* Using local filesystem for images.  */
      return path;
    } else {
      /* Using cloud storage for images.  */
      return res.data;
    }
  } catch (err) {
    console.error(err.response.data);
  }
};

export { getImageUrl };
