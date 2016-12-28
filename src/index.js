const React = require('react');
const ReactDOM = require('react-dom');


var CreateTask = React.createClass({
    addunique: function(event){
        console.log(event);
        event.preventDefault();

        var dashData2={
            task: event.target.children['task'].value
        };
        var serDashData2 = $('.form2').serialize();

        $.post('/api/unique', serDashData2, function(data){
            console.log(serDashData2);
            console.log(data);
            document.location.reload(true);
        })
    },
    render: function(){
        return (
            <form className="form2" onSubmit = {this.addunique}>
            <input type = "text" name = "task" placeholder="task"/>
            <button type = "submit">Enter</button>
            </form>

        )
    }
});

// create container
var GetBox = React.createClass({
getInitialState: function(){

 var items2 =[];

 if(localStorage.getItem('uniqueList')){
     var uniqueList = localStorage.getItem('uniqueList');
     console.log('local storaged');
     items2 = JSON.parse(uniqueList)
 }
 else{
     console.log('not local storaged');
var request = new XMLHttpRequest();
request.open('GET', 'api/unique', false)
request.send(null)
if(request.status == 200){
    console.log(request.responseText);
    var parsed = JSON.parse(request.responseText);
    for(var i = 0; i< parsed.length; i++){
        items2.push(parsed[i])
    }
}
}

window.localStorage.uniqueList = JSON.stringify(items2)
return {items2}

},
isDone: new Date().toLocaleString(),
handleToggleComplete: function(nodeId){
    var data = this.state.items2;
    for(var i in data){
        if(data[i].id == nodeId){
            data[i].complete = data[i].complete === 'true' ? 'false': 'true';
            break;
        }
    }
    this.setState({data})
    window.localStorage.uniqueList = JSON.stringify(data)
    return;
},


render: function(){
    return(
        <div className="well">
    <h1 className="vert-offset-top-0">To do: {this.isDone}</h1>
    <TodoList items2={this.state.items2}  toggleComplete={this.handleToggleComplete}  />
    <TodoForm onTaskSubmit={this.handleSubmit} />
</div>
    );
}
});

// create list

var TodoList = React.createClass({
    toggleComplete: function(nodeId){
        this.props.toggleComplete(nodeId);
            return;

    },
    render: function(){
        var listNodes = this.props.items2.map(function(listItem){
            return(
                				<TodoItem key={listItem.id} nodeId={listItem.id} task={listItem.task} complete={listItem.complete} removeNode={this.removeNode} toggleComplete={this.toggleComplete} />
            );
        }, this);
        return(
            <ol className="list-group">
            {listNodes}
            </ol>
        )
    }
});

// create todo items functionality
var TodoItem = React.createClass({
    toggleComplete: function(e){
        e.preventDefault();
        this.props.toggleComplete(this.props.nodeId);

        return;
    },
    render: function(){

        var classes = "todo clearfix"
        if(this.props.complete === 'true'){
            classes = "fin list-group-item-success"
            this.props.done = 'yes'
        }
        return (
            <li className={classes}>
				{this.props.task} {this.props.done}
				<div className="pull-right" role="group">
			 <button type="button" className="btn btn-xs btn-success img-circle" onClick={this.toggleComplete}>&#x2713;</button>

				</div>
			</li>
        )
    }
});

// create form

var TodoForm = React.createClass({

	render: function() {
		return (
        <div>
				<hr />
			</div>
		);
	}
});

// ReactDOM.render(<TodoForm />, document.getElementById('todoform'));
// ReactDOM.render(<TodoList />, document.getElementById('todolist'));
// ReactDOM.render(<TodoItem />, document.getElementById('todoItem'));
ReactDOM.render(<GetBox/>, document.getElementById('getBox'));
ReactDOM.render(<CreateTask />, document.getElementById('createTask'))
