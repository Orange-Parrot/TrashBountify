
    var map ;
    // Initialize and add the map

    var clearStateCbs = []
    const TopBar = (function(){
        const topBar = document.querySelector(".top-bar");
        console.log(topBar);
        const text = topBar.querySelector("h3");
        const closeButton = topBar.querySelector("button");
        closeButton.addEventListener("click",hide)
        function addText(str){
            hide();
            text.innerHTML = str;
            topBar.style.display= "flex";
        }
        function hide(){
            console.log(topBar);
            clearStateCbs.forEach(cb =>cb());
            topBar.style.display= "none";
        }
        return {addText,hide};
    })();
    const BottomBar = (function(){
        const barAdd = document.querySelector(".bottom-bar-add");
        const addBox = document.querySelector(".add-box");
        const Coord = addBox.querySelector(".location");
        const bountyInput = addBox.querySelector(".bounty");
        const descriptionInput = addBox.querySelector(".description");
        const postBtn = addBox.querySelector("button");
        const bountyTabBtn = document.querySelector(".bottom-bar-bounty-btn");
        bountyTabBtn.addEventListener("click",function(){
            BountyTab.open();
        })
        const exploreTabBtn = document.querySelector(".bottom-bar-explore-btn");
        exploreTabBtn.addEventListener("click",function(){
            MarkerModule.updateMarkers();
            BountyTab.close();
        })
        var mapClickListenerHandle;//used to remove listenr
        var latlng;
        clearStateCbs.push(clearState);
        
        postBtn.addEventListener("click",function(){
            let bounty = parseFloat(bountyInput.value);
            let description = descriptionInput.value;
            console.log(latlng.lat());
            var message = {
                bounty,description,
                coord:[latlng.lat(),latlng.lng()]
            }
            MarkerModule.uploadBountyMarker(message);
            bountyInput.value = "";
            descriptionInput.value="";
            addBox.classList.remove("active");
        })//send the input of the bounty to the network
        barAdd.addEventListener("click", function(){
            console.log(Login.isLoggedIn());
            if(!Login.isLoggedIn()){ Login.startLogin();return;}
            console.log("hello");
            TopBar.addText("Adding a bounty-click anywhere to add")
            
            function mapEventCb(mapsMouseEvent){
                
                addBox.classList.add("active");
                // Create a new InfoWindow.
                latlng= (mapsMouseEvent.latLng)
                openAddBox();
            }
            mapClickListenerHandle =map.addListener('click', mapEventCb);
        }) 
        function openAddBox(){
            Coord.innerHTML = latlng;
            console.log(latlng)
        }
        
        function clearState(){
            if(mapClickListenerHandle){
           mapClickListenerHandle.remove();}
           addBox.classList.remove("active");
        }
    })()
    async function initMap() {
        allMarkers = [];
       // var location = await getLocation();
       
        //console.log(location);
        
       
        
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 33.8704, lng: -117.9242},
            zoom: 12,
            disableDefaultUI: true
          });
         
      ///  updateMarkers([{location:{
        //    coordinates:[location.coords.latitude,location.coords.longitude]
      //  }}])
        
      MarkerModule.updateMarkers();
        google.maps.event.addListener(map,"click",(e)=>{
            console.log(e.latLng.lat());
        })
        getLocation();
      }


 function makeMarkerObj(marker,id){
    
 }


 function bountyPosition(){
     
 }
 async function getLocation(){
     try{

     
    var pos = await new Promise(function(resolve,reject){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(location){
                resolve(location);
            });
       }
       else{
           reject("error");
       }
    })}
    catch(e){
        console.log(e);
    }
    return pos;
   
}