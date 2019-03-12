export default {
  Entry: [
    {
      path: 'category',
      select: '_id name',
    },
    {
      path: 'author',
      select: '_id name',
    },
  ],
};
