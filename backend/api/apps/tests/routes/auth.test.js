const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const getUser = jest.fn();
const addUser = jest.fn();
const deleteUser = jest.fn();
const updateUser = jest.fn();

const app = makeApp({
  getUser,
  addUser,
  deleteUser,
  updateUser
})

/**
 * Test for the signup query
 */
describe('Post /user/signup', ()=>{

    beforeEach(()=>{
        addUser.mockReset();
    })

    test('should save the username and password to the database', async ()=>{
        const bodydata = [
            { username: "username1", password: "password1"},
            { username: "username2", password: "password2"},
            { username: "username3", password: "password3"}
        ]

        for (const body of bodydata){
            addUser.mockReset();
            addUser.mockResolvedValue({
                message:"User added succesfully",
                user: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    firstname: 'John',
                    lastname: 'Doe',
                    password: '20042',
                    isBusiness: false
                  }
            });

            const res = await request(app)
                .post('/api/user/signup')
                .send(
                    body
                )

            expect(addUser.mock.calls.length).toBe(1);
            expect(addUser.mock.calls[0][0]).toBe(body.username);
            expect(addUser.mock.calls[0][1]).toBe(body.password);
        }
        
    })

    test('should return a json object containing the user id ', async ()=>{
        let data = {
            id: 1,
            email: 'johndoe@gmail.com',
            username: 'johnny',
            firstname: 'John',
            lastname: 'Doe',
            password: '20042',
            isBusiness: false
          }
        
        for (let i = 0; i < 10; i++){
            
            
            addUser.mockReset();
            addUser.mockResolvedValue({
                message:"User added succesfully",
                user: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    firstname: 'John',
                    lastname: 'Doe',
                    password: '20042',
                    isBusiness: false
                  }
            });

            const res = await request(app)
                .post('/api/user/signup')
                .send(
                    { username: "username1", password: "password1"}
                )

            expect(res.body.userData).toEqual(data);
            expect(res.body.message).toEqual("User added succesfully")
        }
    })

    test('should return a status code of 200', async ()=>{
        addUser.mockResolvedValue({
            message:"User added succesfully",
            user: {
                id: 1,
                email: 'johndoe@gmail.com',
                username: 'johnny',
                firstname: 'John',
                lastname: 'Doe',
                password: '20042',
                isBusiness: false
              }
        });
        
        const res = await request(app)
            .post('/api/user/signup')
            .send(
                { username: "username1", password: "password1"}
            )

        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for login query
 */
describe('Post /user/login', ()=>{
    beforeEach(()=>{
        getUser.mockReset();
    })

    test('should check the username and password are in the database', async ()=>{
        const bodydata = [
            { username: "username1", password: "password1"},
            { username: "username2", password: "password2"},
            { username: "username3", password: "password3"}
        ]

        for (const body of bodydata){
            getUser.mockReset();
            getUser.mockResolvedValue({
                message:"User logged in succesfully",
                user: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    firstname: 'John',
                    lastname: 'Doe',
                    password: '20042',
                    isBusiness: false
                  }
            });

            const res = await request(app)
                .post('/api/user/login')
                .send(
                    body
                )

            expect(getUser.mock.calls.length).toBe(1);
            expect(getUser.mock.calls[0][0]).toBe(body.username);
            expect(getUser.mock.calls[0][1]).toBe(body.password);
        }
        
    })

    test('should return a json object containing the user data and a message ', async ()=>{
        let data = {
            id: 1,
            email: 'johndoe@gmail.com',
            username: 'johnny',
            firstname: 'John',
            lastname: 'Doe',
            password: '20042',
            isBusiness: false
          }
        
        for (let i = 0; i < 10; i++){
            
            getUser.mockReset();
            getUser.mockResolvedValue({
                message:"User logged in succesfully",
                user: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    firstname: 'John',
                    lastname: 'Doe',
                    password: '20042',
                    isBusiness: false
                  }
            });

            const res = await request(app)
            .post('/api/user/login')
            .send(
                { username: "username1", password: "password1"}
            )

            expect(res.body.userData).toEqual(data);
            expect(res.body.message).toEqual("User logged in succesfully");
        }
    })

    test('should return a status code of 200', async ()=>{
        getUser.mockResolvedValue({
            message:"User logged in succesfully",
            user: {
                id: 1,
                email: 'johndoe@gmail.com',
                username: 'johnny',
                firstname: 'John',
                lastname: 'Doe',
                password: '20042',
                isBusiness: false
              }
        });
        
        const res = await request(app)
            .post('/api/user/login')
            .send(
                { username: "username1", password: "password1"}
            )

        expect(res.statusCode).toEqual(200);
    })

})

/**
 * Test for the update user query
 */
describe('Post /user/update', ()=>{
    beforeEach(()=>{
        updateUser.mockReset();
    })

    test('should update the username and password in the database', async ()=>{
        const bodydata = [
            { userId: 1, data: "password1"},
            { userId: 2, data: "password2"},
            { userId: 3, data: "password3"}
        ]

        for (const body of bodydata){
            updateUser.mockReset();
            updateUser.mockResolvedValue({
                message:"User updated succesfully",
                user: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    firstname: 'John',
                    lastname: 'Doe',
                    password: '20042',
                    isBusiness: false
                  }
            });

            const res = await request(app)
                .post('/api/user/update')
                .send(
                    body
                )

            expect(updateUser.mock.calls.length).toBe(1);
            expect(updateUser.mock.calls[0][0]).toBe(body.userId);
            //expect(updateUser.mock.calls[0][1]).toBe(body.data);
        }
        
    })

    test('should return a json object containing the user id ', async ()=>{
        let body = {
            id: 1,
            email: 'johndoe@gmail.com',
            username: 'johnny',
            firstname: 'John',
            lastname: 'Doe',
            password: '20042',
            isBusiness: false
          }

        for (let i = 0; i < 10; i++){
            updateUser.mockReset();
            updateUser.mockResolvedValue({
                message:"User updated succesfully",
                user: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    firstname: 'John',
                    lastname: 'Doe',
                    password: '20042',
                    isBusiness: false
                  }
            });

            const res = await request(app)
                .post('/api/user/update')
                .send(
                    { username: "username1", password: "password1"}
                )

            expect(res.body.userData).toEqual(body);
            expect(res.body.message).toEqual("User updated succesfully");
        }
    })

    test('should return a status code of 200', async ()=>{
        updateUser.mockResolvedValue({
            message:"User updated succesfully",
            user: {
                id: 1,
                email: 'johndoe@gmail.com',
                username: 'johnny',
                firstname: 'John',
                lastname: 'Doe',
                password: '20042',
                isBusiness: false
              }
        });
        
        const res = await request(app)
            .post('/api/user/update')
            .send(
                { username: "username1", password: "password1"}
            )

        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for the delete user query
 */
describe('Post /user/delete', ()=>{
    beforeEach(()=>{
        deleteUser.mockReset();
    })

    test('should delete the username and password from the database', async ()=>{
        const bodydata = [
            { username: "username1", password: "password1"},
            { username: "username2", password: "password2"},
            { username: "username3", password: "password3"}
        ]

        for (const body of bodydata){
            deleteUser.mockReset();
            deleteUser.mockResolvedValue({
                message:"User deleted succesfully",
                user: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    firstname: 'John',
                    lastname: 'Doe',
                    password: '20042',
                    isBusiness: false
                  }
            });

            const res = await request(app)
                .post('/api/user/delete')
                .send(
                    body
                )

            expect(deleteUser.mock.calls.length).toBe(1);
            expect(deleteUser.mock.calls[0][0]).toBe(body.userId);
        }
        
    })

    test('should return a json object containing the user id ', async ()=>{
        let data = {
            id: 1,
            email: 'johndoe@gmail.com',
            username: 'johnny',
            firstname: 'John',
            lastname: 'Doe',
            password: '20042',
            isBusiness: false
          }      

        for (let i = 0; i < 10; i++){
            deleteUser.mockReset();
            deleteUser.mockResolvedValue({
                message:"User deleted succesfully",
                user: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    firstname: 'John',
                    lastname: 'Doe',
                    password: '20042',
                    isBusiness: false
                  }
            });

            const res = await request(app)
                .post('/api/user/delete')
                .send(
                    { username: "username1", password: "password1"}
                )

            expect(res.body.userData).toEqual(data);
            expect(res.body.message).toEqual("User deleted succesfully");
        }
    })

    test('should return a status code of 200', async ()=>{
        deleteUser.mockResolvedValue({
            message:"User deleted succesfully",
            user: {
                id: 1,
                email: 'johndoe@gmail.com',
                username: 'johnny',
                firstname: 'John',
                lastname: 'Doe',
                password: '20042',
                isBusiness: false
              }
        });
        
        const res = await request(app)
            .post('/api/user/delete')
            .send(
                { username: "username1", password: "password1"}
            )

        expect(res.statusCode).toEqual(200);
    })
})

