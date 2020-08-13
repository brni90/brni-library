# Brni Library

Last stable version release: none
Last version released: beta-version (0.0.10)

## Introduction
This library mainly built with **Angular** 9.1.9, **Rxjs** 6.5.5 and **CSS Spinner by LukeHaas** (https://projects.lukehaas.me/css-loaders/).

Brni Library provides a component (**BL-Search-Google-Like-Component**) for simulating the google like searching highly customable.


## Installation

With [NPM](https://www.npmjs.com/package/brni-library):

```bash
npm install --save brni-library
```

## Usage

In your Angular module:

```ts
.....

import {BrniLibraryModule} from 'brni-library';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    BrniLibraryModule
  ],
  providers: [...],
  bootstrap: [...]
})
export class AppModule { }

```


# Styling 

You can personalize the color and the font-size, used by Brni’s Library, declaring two custom CSS variables in your stylesheet (for example styles.scss)

For Example:
```

:root {
—lib-brni-primary-color: orange;
—lib-brni-font-size: “small”;
}

```

If you don’t declare these two custom CSS variables (—lib-brni-primary-color and —lib-brni-font-size) or for browser don’t support CSS variables, the library uses the default values: #0085AD and “medium”.

## BL-Search-Google-Like-Component

**Example with Static DataSource (debounceTime 500ms)**:

![(Static DataSource 500ms)](https://drive.google.com/uc?export=view&id=13m8FW1A09cR5d3gUch_L1mC17t2n_cEw)

----------------------------------------------------------------

**Example with Static DataSource (debounceTime 3000ms)**:

![(Static DataSource 3000ms)](https://drive.google.com/uc?export=view&id=1toijV5k7aQclrQreB9GOrGHIGhto4_9O)

----------------------------------------------------------------

**Example with Dynamic DataSource (debounceTime 500ms)**:

![(Static DataSource 3000ms)](https://drive.google.com/uc?export=view&id=1IRCPw3bT6bAPmGuj94W5G8WjuAObIO50)

----------------------------------------------------------------

### Input Parameters 

*	**placeholder** (type: **string** - default value: “Enter text”): placeholder for the input tag

*	**debounceTime** (type: **number** - default value: 500): milliseconds of debounce time for the input tag

*	**isDynamicDataSource** (type: **boolean** - default value: false): the dataSource can be dynamic or not. The static DS will never changes independly which user enters on the input tag. The dynamic DS will change each time user digits a text on the input tag and debounce time expires 
<br/>

*	**dataSourceObj** (type: **IBLDataSource**): Datasource which contains all items selectable

  The type of dataSourceObj must be:
  ```
  IBLDataSource<T>
  {
    searchedValue?: string,
    dataSource: T[];
  }
  ```

  The searchedValue parameter (inside the IBLDataSource type) must contains the searchText inserted by the user and returned by the Output Event Emitter searchedValue.
  For Non-Dynamic DataSource, the searchedValue parameter is optional.


*	**dataSourcePropertyToUse** (type: **string** - default value: null): if the type T of datasource’s item is a string, this parameter is optional (must be null). Otherwise, this parameter must corresponds to the name of object’s parameter which we want to use for the searching


*	**noResultsFound** (type: **string** - default value: “No results found”)


*	**heightInputText** (type: **string** - default value: “30px”)


*	**maxHeightDropdown** (type: **string** - default value: “200px”)


*	**width** (type: **string** - default value: “200px”)

* **delayBlurEvent** (type: **number** - default value: 150)


### Output Parameters

*	**searchedValue** (type: **EventEmitter<string>**): text inside the input tag. This EventEmitter fires when debounce time expires or when user click on a item inside the dropdown.


*	**selectedValue** (type: **EventEmitter<any>**): item (of the datasource) selected by the user in the dropdown


*	**waitingForDataSource** (type: **EventEmitter<boolean>**): EventEmitter “active” for dynamic datasource. When user enter text inside the input tag and debounce time expires, the Component start waiting for datasource (emitting true). In the dropdown appears a spinner until the datasource will be received by the component (detected by searchedValue parameter in IBLDataSource Type). When datasource will be received, this EventEmitter emits false.

## License
[MIT](https://choosealicense.com/licenses/mit/)