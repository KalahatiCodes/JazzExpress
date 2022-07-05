
const deleteIt = document.getElementsByClassName("fa-delete-left");


Array.from(deleteIt).forEach(function(element) {
      element.addEventListener('click', function(){
        let piece = this.parentNode.parentNode.childNodes[3].innerText
        let composer = this.parentNode.parentNode.childNodes[7].innerText
        fetch('items', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'composer': composer,
            'piece': piece
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
