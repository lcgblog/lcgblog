import { GetServerSideProps } from "next";
import Detail, { DetailProps } from "views/Detail";

export default Detail;

export const getServerSideProps: GetServerSideProps<Partial<DetailProps>> = async (ctx) => {
    const { id = "" } = ctx.query;
    return {
        props: {
            id: id as string
        }
    };
};
