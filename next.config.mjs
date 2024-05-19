/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false, //so useEffect doesn't execute twice
    images:{
        domains:['lh3.googleusercontent.com'] //database
    }
};

export default nextConfig;
