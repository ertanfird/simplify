import md5 from 'md5';

const avatarGenerator = (username) => {
  return(
    parseInt(md5(username).replace(/[^\d]/g, '')).toString()[0]
  );
};

export default avatarGenerator;