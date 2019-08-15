
// 2.0 ES6 TRICKS


// ---------------------------------------------
// lambda (fat arrow) anonymous functions
// ---------------------------------------------

const doStuff = (a, b, c) => {...}

// same as:
function doStuff(a, b, c) {
  ...
}

  
// ---------------------------------------------  
// object destructuring
// ---------------------------------------------
  
const doStuff({a, b, c}) = {
  console.log(a);
}
  
// same as:
const doStuff(params) = {
  const {a, b, c} = params;
  
  console.log(a);
} 
                              
// same as:                             
const doStuff(params) = {  
  console.log(params.a);
}

                              
// ---------------------------------------------                            
// array destructuring
// ---------------------------------------------

const [a, b] = [1, 2];
                              
// same as:
const array = [1, 2];
const a = array[0];
const b = array[1];

// IMMUTABILITY 


// RULE: DONT PUSH YOUR ARRAYS
// USE SPREAD OPPERATOR

// bad: 

a.push('microsoft')

// good: 
const newArray = [...a, 'microsoft']

//  RULE: DO NOT USE VAR 
//  RULE: TRY TO AVOID LET 

// bad 

let discount;

if (isLoggedIn) {
  if (cartTotal > 100  && !isFriday) {
    discount = 30;
  } else if (!isValuedCustomer) {
    discount = 20;
  } else {
    discount = 10;
  }
} else {
  discount = 0;
}

// good

const getDiscount = ({isLoggedIn, cartTotal, isValuedCustomer}) => {
  if (!isLoggedIn) {
    return 0;
  }

  if (cartTotal > 100  && !isFriday()) {
    return 30;
  }
  
  if (!isValuedCustomer) {
    return 20;
  }
  
  return 10;
}

// AVOID PASSING MULTIPLE PARAMETERS TO FUNCTION
// USING ARGUMENT OBJECT MAKES ORDER OF ARGUMENTS IRRELEVANT 

// bad

const total = computeShoppingCartTotal(itemList, 10.0, 'USD');

//  good 

const computeShoppingCartTotal = ({ itemList, discount, currency }) => {...};

const total = computeShoppingCartTotal({ itemList, discount: 10.0, currency: 'USD' });


// RETURNING OBJECTS FROM FUNCTIONS

// BAD
const result = saveUser(...);

// GOOD 

const { user, status } = saveUser(...);
                                 
...

const saveUser = user => {
   ...

   return {
     user: savedUser,
     status: "ok"
   };
};

// EXCEPTIONS BREAK FUNCTION COMPOSITION
// BAD
const fetchBlogPost = id => {
  const post = api.fetch(`/api/post/${id}`);

  if (!post) throw new Error(`Post with id ${id} not found`);

  return post;
};

const html = postIds |> map(fetchBlogPost) |> renderHTMLTemplate;

// GOOD

const fetchBlogPost = id => {
  const post = api.fetch(`/api/post/${id}`);

  return post
      // null for error if post was found
    ?  [null, post]
      // null for result if post was not found
    :  [`Post with id ${id} not found`, null];
};

const blogPosts = postIds |> map(fetchBlogPost);

const errors =
  blogPosts
  |> filter(([err]) => !!err)  // keep only items with errors
  |> map(([err]) => err); // destructure the tuple and return the error

const html =
  blogPosts
  |> filter(([err]) => !err)  // keep only items with no errors
  |> map(([_, result]) => result)  // destructure the tuple and return the result
  |> renderHTML;


//  TRICKS 

/* 1. Passing object to a function */
// Look at this function
var bigFunction = function(length, breadth, width, height, size, count, min, max, average, mean, mode){
    return length + breadth + width + height + size + count + min + max + average + mean + mode;
}
 
// Isn't the number of arguments being passed too long?, woudnt it be better if you can 'encapsulate' them?
// What happens if new arguments are added? so for that you do this:
 
// Create a wrapper/class to hold these properties
var allArgumentsWrapped = {
    length:0,
    breadth:0,
    width:0,
    height:0,
    size:0,
    count:0,
    min:0,
    max:0,
    average:0,
    mean:0,
    mode:0
};
 
// and then use it in the function
var cuteFunction = function(allArgumentsWrappedObject){
    // use it like var len = allArgumentsWrappedObject.length;
}
 
// call it by
cuteFunction(allArgumentsWrapped);
 
/* 2. Returning an object from a function */
var objectReturningFunc = function(){
    allArgumentsWrapped.length = 100;
    return allArgumentsWrapped;
}
 
var result = objectReturningFunc();
// result.length will hold 100
 
/* Passing function to a function */
var doSomething = function(whatToCallWhenIamDone){
    var someValue = 10;
    whatToCallWhenIamDone(10); // call the function that is passed as an argument to this function
}
 
var callMeWhenYouAreDone = function(value){
    // console.log(value); // will get the value ie 10
}
 
doSomething(callMeWhenYouAreDone);


function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// expected output: 6

console.log(sum.apply(null, numbers));
// expected output: 6


//  REQUIRED ARGUMENTS

const req = name => {
  throw new Error(`The value ${name} is required.`);
};

const doStuff = ( stuff = req('stuff') ) => {
  ...
}

// SHORT CIRCUIT CONDITIONALS AND EVALUATION

const getUserCity = user =>
  user && user.address && user.address.city;
  
const user = {
  address: {
    city: "San Francisco"
  }
};

// Returns "San Francisco"
getUserCity(user);

// Both return undefined 
getUserCity({});
getUserCity();


// DEBUG WITH IN PLACE DEBUGGING 

const add = (a, b) =>
  console.log('add', a, b)
  || (a + b);

const User = ({email, name}) => (
  <>
    <Email value={console.log('email', email) || email} />
    <Name value={console.log('name', name) || name} />
  </>
)

