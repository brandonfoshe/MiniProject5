import { useState } from 'react'

   const [isLoading, setIsLoading] = useState(true);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   
export default async function fetchData(){
 try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      if (!response.ok) throw new Error("failed to fetch");

      const myData = await response.json();
      setData(myData);
      setError(null);
      //console.log(data);
    } catch (err) {
      setError(err);
      //console.log(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
    return myData;
}
