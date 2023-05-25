import axios from 'axios';

const getImage = async (filename, setImageUrl) => {
  const path = `/image/${filename}`;
  try {
    const res = await axios.get(path);
    if (res.headers['content-type'] === 'image/jpeg') {
      /* Using local filesystem for images.  */
      setImageUrl(path);
    } else {
      /* Using cloud storage for images.  */
      setImageUrl(res.data);
    }
  } catch (err) {
    console.error(err.response.data);
  }
};

export { getImage };
