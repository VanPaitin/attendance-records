# Attendance Records

This is the single source of truth for all things attendance in The Redeemed Christian Church of God, Good Shepherd's Pasture. It does not just contain attendance records, it is also equipped with the ability to run different kind of reports and to download them as well.

### How to get the app running

#### Prequisites

This is an application written in Ruby on Rails. In order to run it, you will need to install ***Ruby*** on your system. In addition to ruby, you will also need to install ***rails***. You can easily install ruby by following the instructions here:

* If you don't have RVM already installed, you will be able to get it [here](https://rvm.io/). Run the *curl* command:
```bash
curl -sSL https://get.rvm.io | bash -s stable
```

* With rvm already installed, you can install any ruby version you want:

```bash
rvm install 2.6.3
```

##### Ruby Version
* 2.6.3

##### Rails Version
* 6.0.2.1

### Running the app

- Clone the project.

- Inside the project directory, run this command:

```bash
bundle install
```
- Also run this command to setup your database and perform the necessary seeds

```bash
bin/rails db:setup
```

- With all of that setup. If you will developing only on the backend part of the app, simply run the app by running

```bash
bin/rails server
```
The above command will use port 3000 by default, to specify a port simply specify the port number with a ***-p*** flag.

- If you will be performing some front end changes, in addition to running the above the command, you will want to run:

```bash
bin/webpack-dev-server
```
This will run the webpack development server that enables assets compilation immediately after changing the code.

- You can visit the app and play around with it at [http://localhost:3000](http://localhost:3000)

### Project Directory Structure

To make changes to the frontend portion of the application, simply look in the `app/javascript` folder and make your necessary changes there
