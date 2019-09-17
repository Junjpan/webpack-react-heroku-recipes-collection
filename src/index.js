import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import "./index.scss";
import uuid from "uuid";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  search() {
    this.setState({ keyword: this.refs.keyword.value }, function () {
      let searchKey = this.state.keyword.toLowerCase();
      //console.log(searchKey)
      this.props.keyword(searchKey);
    })
  }
  closeSearch() {
    $(".searchForm").css("display", "none");
  }
  render() {
    return (<div className="searchForm">
      <input type="text" ref="keyword" style={{ width: "600px", height: "50px" }} placeholder="SEARCH"></input>
      <button onClick={this.search.bind(this)} style={{ height: "50px", width: "60px", color: "#032f3e" }}><i className="zmdi zmdi-search zmdi-hc-lg" ></i></button>
      <button onClick={this.closeSearch.bind(this)} style={{ height: "50px", width: "60px", color: "red" }}><i className="zmdi zmdi-close-circle zmdi-hc-lg"></i></button> <br />
    </div>)
  }
}


class RecipeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newrecipe: {}
    };
  }

  add() {
    if (this.refs.name.value === "" || this.refs.ingrident.value === "" || this.refs.directions.value === "") { alert("Please fill out the field with '*' symbol before you add the recipe!") }
    else {
      this.setState(
        {
          newrecipe: {
            id: uuid.v4(),
            img: this.refs.url.value,
            name: this.refs.name.value,
            ingridents: this.refs.ingrident.value,
            directions: this.refs.directions.value
          }
        },
        function () {
          this.props.recipe(this.state.newrecipe);
        }
      );
      $(".add-recipe-form").css("display", "none");
    }
  }

  closeWindow() {
    $(".add-recipe-form").css("display", "none");
  }

  render() {
    return (

      <div className="add-recipe-form">
        <div>
          <h4 style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
            ADD Recipe
          </h4>
          <h3 onClick={this.closeWindow.bind(this)} style={{ position: "relative", textAlign: "right", marginRight: "10%" }}><i className="zmdi zmdi-close-circle zmdi-hc-fw"></i></h3>
        </div>
        <br />
        <label>Recipe Name *:</label>
        <br />
        <input ref="name" />
        <br />
        <label>Ingridents *:</label>
        <br />
        <textarea ref="ingrident" />
        <br />
        <label>Directions *:</label>
        <br />
        <textarea ref="directions" />
        <br />
        <label>Image URL:</label>
        <br />
        <input type="text" placeholder="url(otpional)" ref="url" />
        <br />
        <button onClick={this.add.bind(this)}>ADD</button>
      </div>
    );
  }
}

class Recipe extends React.Component {
  constructor() {
    super();
    this.state = {
      recipeitem: {},
      edititem: {},
      status: false,
      editstatus: false,
      recipe: [],
    };
  }


  componentWillMount() {
    var recipeFromStorage = JSON.parse(localStorage.getItem("recipe"));
    if (localStorage.getItem("recipe") === null || recipeFromStorage.length === 0) {
      var recipeArr = [{
        id: uuid.v4(),
        img:
          "https://images.media-allrecipes.com/userphotos/720x405/667748.jpg",
        name: "Spaghetti Sauce with Ground Beef",
        ingridents:
          "lb. lean ground beef \n\n 1 sweet onion, diced \n\n 4 cloves garlic, minced \n\n 2 3/4 c. water\n\n15 oz. canned tomato sauce\n\n 15 oz. canned diced tomatoes, drained\n\n1 tbsp. dried Italian seasoning\n1 tsp. kosher salt\n\n1 tsp. Freshly ground black pepper\n\n1/2 tsp. sugar\n\n12 oz. spaghetti\n\n1/2 c. freshly grated Parmesan\n\n2 tbsp. chopped parsley",
        directions:
          "In a Dutch oven over medium-high heat, add beef, onion, and garlic and cook until beef is cooked through. Drain fat.Add water, tomato sauce, diced tomatoes, Italian seasoning, salt, pepper, and sugar. Bring to a boil over high heat. Break spaghetti noodles in half and add to pan. Reduce heat to a simmer and cover. Cook, stirring often, until noodles are cooked through, 12 to 15 minutes.Stir in the Parmesan and parsley just before serving"
      },
      {
        id: uuid.v4(),
        img:
          "https://static01.nyt.com/images/2014/04/29/dining/Roasted-Brussels-Sprouts/Roasted-Brussels-Sprouts-articleLarge-v3.jpg",
        name: "Roasted Brussels Sprouts With Garlic",
        ingridents:
          "1 pint brussels sprouts (about a pound)\n\n 4 to 6 tablespoons extra virgin olive oil, to coat bottom of pan\n\n5 cloves garlic, peeled\n\nSalt and pepper to taste\n\n1 tablespoon balsamic vinegar",
        directions:
          "Heat oven to 400 degrees. Trim bottom of brussels sprouts, and slice each in half top to bottom. Heat oil in cast-iron pan over medium-high heat until it shimmers; put sprouts cut side down in one layer in pan. Put in garlic, and sprinkle with salt and pepper.Cook, undisturbed, until sprouts begin to brown on bottom, and transfer to oven. Roast, shaking pan every 5 minutes, until sprouts are quite brown and tender, about 10 to 20 minutes.Taste, and add more salt and pepper if necessary. Stir in balsamic vinegar, and serve hot or warm."
      }];
      var recipeJSON = JSON.stringify(recipeArr);
      //console.log(recipeJSON);
      localStorage.setItem("recipe", recipeJSON);
      recipeFromStorage = JSON.parse(localStorage.getItem("recipe"))
      //console.log(recipeFromStorage);
      this.setState({ recipe: recipeFromStorage });
    }
    else {
      this.setState({ recipe: recipeFromStorage });
    }

  }
  closeWindow() {
    if (this.state.status) {
      this.setState({ status: false });
    }
    if (this.state.editstatus) {
      this.setState({ editstatus: false });
    }
  }
  addRecipe(recipe) {
    let arr = this.state.recipe;
    arr.push(recipe);
    let arrJSON = JSON.stringify(arr);
    localStorage.setItem("recipe", arrJSON);

    let arrFromStorage = JSON.parse(localStorage.getItem("recipe"));
    //console.log(arrFromJSON);
    this.setState({ recipe: arrFromStorage });
    //console.log(arr);
  }

  addRecipeForm() {
    $(".add-recipe-form").css("display", "block");
  }


  editRecipe(data) {
    this.setState({
      status: false,
      editstatus: true,
    });
  }
  saveRecipe() {
    var object = {
      id: this.state.recipeitem.id,
      img: this.refs.url.value,
      name: this.refs.name.value,
      ingridents: this.refs.ingridents.value,
      directions: this.refs.directions.value
    }
    var editId = this.state.recipeitem.id;

    var arr = this.state.recipe;
    let i = arr.findIndex(data => {
      return data.id === editId;
    })

    arr[i] = object;
    let arrtoJSON = JSON.stringify(arr);
    localStorage.setItem("recipe", arrtoJSON);
    let arrFromJSON = JSON.parse(localStorage.getItem("recipe"));

    this.setState({
      recipe: arrFromJSON,
      status: true,
      editstatus: false,
      recipeitem: object
    });
    var newarr = this.state.recipe;

  }


  editRecipeForm() {
    return (<div >
      <div className="recipeitem">
        <button onClick={this.saveRecipe.bind(this)}><i className="zmdi zmdi-save zmdi-hc-fw"></i>Save</button>
      </div>
      <table className="table-bordered" >
        <tr>
          <td><i className="zmdi zmdi-close zmdi-hc-lg" onClick={this.closeWindow.bind(this)}></i></td>
        </tr>
        <tr>
          <td><img src={this.state.recipeitem.img} height="200px" width="400px" /></td>
        </tr>
        <input ref="url" defaultValue={this.state.recipeitem.img} style={{ width: "400px" }} ></input>
        <tr>
          <input ref="name" style={{ width: "400px" }} defaultValue={this.state.recipeitem.name}></input>
        </tr>
        <tr>
          <textarea ref="ingridents" style={{ width: "400px", height: "550px" }} defaultValue={this.state.recipeitem.ingridents}></textarea>
        </tr>
        <tr>
          <textarea ref="directions" style={{ width: "400px", height: "300px" }} defaultValue={this.state.recipeitem.directions}></textarea>
        </tr>
      </table>
    </div>);
  }


  openRecipe(data) {
    this.setState({
      recipeitem: data,
      status: true
    });
    // console.log(this.state.recipeitem);

  }
  openRecipeForm() {
    var data = this.state.recipeitem;

    return (<div >
      <div className="recipeitem">
        <button className="delete-button" onClick={this.deleteRecipe.bind(this, data.id)}><i className="zmdi zmdi-delete zmdi-hc-fw"></i>Delete</button> <br />
        <button className="edit-button" onClick={this.editRecipe.bind(this, data)}><i className="zmdi zmdi-edit zmdi-hc-fw"></i>Edit</button><br />
      </div>
      <table className="table-bordered" >
        <tr>
          <td><i className="zmdi zmdi-close zmdi-hc-lg" onClick={this.closeWindow.bind(this)}></i></td>
        </tr>
        <tr>
          <td><img src={data.img} height="200px" width="400px" /></td>
        </tr>
        <tr>
          <td className="recipe-name">{data.name}</td>
        </tr>
        <tr>
          <td dangerouslySetInnerHTML={{ __html: marked(data.ingridents) }}></td>
        </tr>
        <tr>
          <td><b>Directions:</b>{data.directions}</td>
        </tr>
      </table>
    </div>
    );
  }

  deleteRecipe(id) {
    //console.log(id);
    let arr = this.state.recipe;
    var index = arr.findIndex((data) => {
      return data.id === id;
    });
    arr.splice(index, 1);
    let arrtoJSON = JSON.stringify(arr);
    localStorage.setItem("recipe", arrtoJSON);
    let arrFromJSON = JSON.parse(localStorage.getItem("recipe"));
    this.setState({
      recipe: arrFromJSON,
      status: false,
      recipeitem: {}
    });
  }

  opensSearchForm() {
    $(".searchForm").css("display", "block");
  }

  searchForm(keyword) {
    var searcharr = JSON.parse(localStorage.getItem("recipe"));
    var searchResult = searcharr.filter((recipe) => {
      //console.log(recipe.name);
      return recipe.name.toLowerCase().indexOf(keyword) > -1;
    })
    if (searchResult.length === 0) {
      alert("there is no " + keyword + " recipe here,please try to search a different recipe!")
    } else {
      this.setState({
        searchitem: searchResult,
        searchstatus: true
      });
      console.log(this.state.searchstatus);
      console.log(this.state.searchitem);
      $(".searchForm").css("display", "none");
    }
    $(".add").attr('disabled', 'disabled');
  }

  searchResultForm() {

    let searchItem = this.state.searchitem.map((data, index) => {
      return (
        <table className="table-bordered" key={index}>
          <tr>
            <td>
              <img src={data.img} height="210px" width="390px" />
            </td>
          </tr>
          <tr >
            <td className="recipe-name" ref="recipename" onClick={this.openRecipe.bind(this, data)}>
              {data.name}
              <i className="zmdi zmdi-open-in-new zmdi-hc-fw" />
            </td>
          </tr>
        </table>
      );
    });

    return (<div>
      <div className="search"><button className="btn-primary" onClick={this.allRecipe.bind(this)} >
        <i className="zmdi zmdi-book zmdi-hc-lg" />  ALL RECIPES
           </button></div><br />
      {searchItem}</div>);

  }

  allRecipe() {

    var all = JSON.parse(localStorage.getItem("recipe"));
    this.setState({
      recipe: all,
      searchstatus: false
    });
  }


  render() {
    if (this.state.status) {
      return this.openRecipeForm();
    } else if (this.state.editstatus) {
      return this.editRecipeForm();
    } else if (this.state.searchstatus && this.state.searchitem.length > 0) {
      return this.searchResultForm();
    }
    else {

      let eachRecipe = this.state.recipe.map((data, index) => {
        return (
          <table className="table-bordered" key={index}>
            <tr>
              <td>
                <img src={data.img} height="210px" width="390px" />
              </td>
            </tr>
            <tr >
              <td className="recipe-name" ref="recipename" onClick={this.openRecipe.bind(this, data)}>
                {data.name}
                <i className="zmdi zmdi-open-in-new zmdi-hc-fw" />
              </td>
            </tr>
          </table>
        );
      });

      return (
        <div className="menu">
          <button className="btn-primary" className="add" onClick={this.addRecipeForm.bind(this)}>
            <i className="zmdi zmdi-collection-image zmdi-hc-fw" /> ADD RECIPE
      </button>
          <button className="btn-primary" onClick={this.opensSearchForm.bind(this)} style={{ backgroundColor: "white", color: "#032f3e", border: "1px solid #032f3e" }}>
            <i className="zmdi zmdi-search zmdi-hc-lg" />  SEARCH
      </button>
          <div>{eachRecipe}</div>
          <RecipeItem recipe={this.addRecipe.bind(this)} />
          <Search keyword={this.searchForm.bind(this)} />
        </div>
      )
    }
  }
}
ReactDOM.render(<Recipe />, document.getElementById("index"));



