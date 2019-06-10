import { gql } from "apollo-server-core";


export default {
    QueryResolve: {
        async getCompanyList(){
            // todo add company
            return [
                {
                     title: "Company Title",
                     code: "Company Code",
                     name: "Company Name",
                },
                {
                    title: "Company Title",
                    code: "Company Code",
                    name: "Company Name",
               }
            ]
        }
    },
    MutationResolve: {
        async addCompany(_: any){
            // todo add company
        }
    },
    Self: {
        Fragment: gql`
         type Company {
             title: String
             code: String
             name: String
         }
         input CompanyInput{
             title: String
             code: String
         }
          extend type Mutation {
              addCompany(company: CompanyInput): Company
          }

          extend type Query {
            getCompanyList: [Company]
          }
         
        `,
        Resolvers: {}
    }
}