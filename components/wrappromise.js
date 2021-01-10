// borrow from https://sbfl.net/blog/2020/02/10/react-suspense-async/
export const wrapPromise = (promise) => {
    let status = 'pending';
    let result;
  
    const suspender = promise.then( 
      (r) => {
        status = 'fulfilled';
        result = r;
      },
      (e) => {
        status = 'rejected';
        result = e;
    });
  
    const read = () => {
      if(status === 'pending') {
        throw suspender;
      } else if(status === 'rejected') {
        throw result;
      } else {
        return result;
      }
    };
  
    return { read };
  }
