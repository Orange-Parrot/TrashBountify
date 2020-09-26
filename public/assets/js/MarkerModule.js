const InfoModule = (function(){

    const addBox = document.querySelector(".info-box");
    const Coord = addBox.querySelector(".location");
    const bountyEle = addBox.querySelector(".bounty");
    const descriptionEle = addBox.querySelector(".description");
    var takeBountyBtn = addBox.querySelector("button");

    function setInfo(coord,bounty,description,id){
        TopBar.addText("viewing bounty detail");//This must always come first because it clears everything before adding text
        Coord.innerHTML = coord;
        descriptionEle.innerHTML = description;
        bountyEle.innerHTML= bounty;
        addBox.classList.add("active");
    
        var new_element = takeBountyBtn.cloneNode(true);
        takeBountyBtn.parentNode.replaceChild(new_element, takeBountyBtn);
        takeBountyBtn = new_element;
        takeBountyBtn.addEventListener("click",function(){
            console.log("called once");
            fetch("/b/takeBounty/"+id);//need to check later
            close();
        })
       clearStateCbs.push(close);//defined in index.js, used for removing the info box when the user click on go back in the top bar
    }
    function close(){
        addBox.classList.remove("active");
    }
    return {setInfo,close}
})()
const MarkerModule =( function(){
    var allMarkers = [];
    async function updateMarkers(){
        var markerJson = await getAllMarkerWithin();
        for(let i =0;i<allMarkers.length;i++){
            allMarkers[i].setMap(null);
        }
        allMarkers =[];
        markerJson.forEach(mark => {

                
            console.log(mark.location.coordinates);
            var marker = new google.maps.Marker({position: {lat:mark.location.coordinates[0] , lng:mark.location.coordinates[1]}, map: map});
            marker.addListener("click",function(){InfoModule.setInfo(mark.location.coordinates,mark.bounty,mark.description,mark._id)})
            allMarkers.push(marker);
        });
        
     }
     setTimeout(() => {
         updateMarkers();
     }, 20000);
     async function getAllMarkerWithin(){
        var response = await fetch("/b/bounty");
        if(response.ok){
            var json = await response.json();
            console.log(json)
            return json;
        }
        return null;
     }

     async function uploadBountyMarker(data){
        const response = await fetch('/b/bounty', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
          if(response.ok){
              MarkerModule.updateMarkers();
              return true;
          }
          return false;
     }
     async function addBountyMarker(){
         
     }
     return {updateMarkers,getAllMarkerWithin,uploadBountyMarker}
})();
