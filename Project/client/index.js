
let fetchCalls = ()=>{
    let times={};
    for(let i=1;i<=70;i++){
        // times[i]=new Date();
        fetch('http://localhost/movies/',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                pageno: i,
                date: new Date().toString()
            })
        })
            .then((res)=>{
                if(res.status===500){
                    throw new Error("Some Database Error");
                }
                return res.json();
            })
            .then((data)=>{
                times[data.pageno]=new Date()-new Date(data.reqDate);
                if(data.pageno===70){
                    console.log(times);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

};

document.getElementById('fetchCalls').addEventListener('click',(e)=>{
    fetchCalls();
});