// ------------------------------ Hubs scripting utils ------------------------------

// to consider
// driven by keyboard and animation https://gist.github.com/Utopiah/a60d72fb8c781bf8832dc4ea9a673382
// getting the list of available hashes of media objects https://gist.github.com/Utopiah/1866a62d3cb6c066d421a78abd1324e2
// reactive but for Apaint, not Hubs https://gist.github.com/Utopiah/b503f8a3e128e47745c63347b36512e8
// snapping https://gist.github.com/Utopiah/f2b11a8026030b726ecc8c8c9430a9b4
// and https://gist.github.com/Utopiah overall

var actualCode = `
console.log('Mozilla Hubs Utils loaded')

function getAvatarFromName(name){
  for (a of document.querySelectorAll("[networked-avatar]") ){
    var el = document.querySelector("#"+a.id)
    if ( name.trim() == el.components["player-info"].displayName.trim() ) return el
  }
  return null
}

function getFirstElementFromHash(hash){
	var g = AFRAME.scenes[0].querySelectorAll("[media-loader]")
	var matches = []
	for (let e of g){
		var m = e.components["media-loader"].attrValue.src.match(hash)
		if (m && m.length) matches.push(e)
	}
	return matches[0]
}

function attachObjAvatars(){
  for (var a in staffNames){
 		attachObjToAvatar( getFirstElementFromHash(rings[a]), getAvatarFromName(staffNames[a]) )
	}
}

function attachObjToAvatar(obj, avatar){
  NAF.utils.getNetworkedEntity(obj).then(networkedEl => {
    const mine = NAF.utils.isMine(networkedEl)
    if (!mine) var owned = NAF.utils.takeOwnership(networkedEl)
    networkedEl.object3D.position.copy( avatar.object3D.position )
    networkedEl.object3D.position.y += 1.8    
    networkedEl.object3D.rotation.y += 0.2
    networkedEl.object3D.rotation.x = 0
    networkedEl.object3D.rotation.z = 0
  })
}
`

// ------------------------------ end of utils ------------------------------

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();
