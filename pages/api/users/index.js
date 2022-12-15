import connect from "../../../database/connection";
import User from "../../../database/User";

connect();

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        case "GET":
            try {
                const accounts = await User.find({});
                res.status(200).json({ data: accounts });
            } catch (error) {
                // res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const account = await User.create(req.body);
                res.status(201).json({ data: account })
            } catch (error) {
                // res.status(400).json({ success: false });
            }
            break;
        default:
            // res.status(400).json({ success: false });
            break;
    }
}