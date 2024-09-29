//this script is for functions for mods and other patches that don't need to directly modify the gamescript

var functions = window._.functions;

functions.dumpInversify = function(){
    var objects = []
    _.game._rootContainer.sourceContainer._bindingDictionary._map.forEach(function(e){
        if(e[0]['implementationType']){
            objects.push([e[0]['implementationType'].prototype, e[0]['guid'], e[0]['serviceIdentifier']])
        }
    })
    return objects
}

functions.warp = function(zoneName, mapName){
    zone = _.prodigy.world.zones[zoneName];
    mapName = mapName || Object.keys(zone.maps)[0];
    map = zone.maps[mapName];
    x = map.x;
    y = map.y;
    zone.teleport(mapName,x,y,{},{});
}