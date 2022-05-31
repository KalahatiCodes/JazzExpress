
const deleteIt = document.getElementsByClassName("fa-delete-left");


Array.from(deleteIt).forEach(function(element) {
      element.addEventListener('click', function(){
        const piece = this.parentNode.parentNode.childNodes[1].innerText
        const composer = this.parentNode.parentNode.childNodes[3].innerText
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
