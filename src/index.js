const React = require('react');
const ReactDOM = require('react-dom');

var items = [];

var GetAOFs = React.createClass({
    present: function(){
    var request = new XMLHttpRequest();
    request.open('GET', '/api/dashboard', false)
    request.send(null)
    if(request.status == 200){
        console.log(request.responseText);
        var parsed = JSON.parse(request.responseText);
        for(var i = 0; i<parsed.length; i++){
            items.push(parsed[i])
        }
    }
    },

    getInitialState: function() {
    return { items: [] }
},
render: function() {
      this.present()
    var listItems = this.props.items.map(function(item) {
        return (
            <li key={item.aof}>

              <a href="#"> {item.aof}</a>
            </li>
        );
    });
    return (
        <div className='pure-menu'>


            <ol>
                {listItems}
            </ol>
        </div>
    );
}
});

var AddAOF = React.createClass({
    addAOF: function(event){
        console.log(event);
        event.preventDefault();

        var dashData={
            task: event.target.children['aof'].value
        };
        var serDashData = $('form').serialize();

        $.post('/api/dashboard', serDashData, function(data){
            console.log(serDashData);
            console.log(data);
            document.location.reload(true);
        })
    },
    render: function(){
        return (
            <form onSubmit = {this.addAOF}>
            <input type = "text" name = "aof" placeholder="Area of Focus"/>
            <button type = "submit">Enter</button>
            </form>
        )
    }
});


ReactDOM.render(<AddAOF />, document.getElementById('dashboard'));
ReactDOM.render(<GetAOFs items={items} />, document.getElementById('AOFList'));
