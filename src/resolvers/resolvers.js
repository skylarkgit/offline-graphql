import gql from "graphql-tag";

const getAllTasks = gql`
    query Task {
        tasks @client {
            title
            description
        }
    }
`;

export const resolvers = {
    Mutation: {
        addTask: (parent, { title, description }, { cache }, info) => {
            const {tasks} = cache.readQuery({
                query: getAllTasks
            });
            console.log('addTask', parent, cache, {title, description}, tasks);
            tasks.push({title, description, __typename: 'Task'});
            cache.writeData({data: {tasks}});
        },
        writeTasks: (parent, tasks, { cache }, info) => {
            cache.writeData({data: {tasks}});
        }
    },
    Query: {
        getAllTasks: (parent, args, { cache }) => {
            console.log('getAllTask', parent, args, cache);
            return cache.readQuery({
                query: getAllTasks 
            });
        }
    }
}