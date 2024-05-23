"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";

import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const fetchPosts = async (): Promise<Post[]> => {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/posts"
	);

	return response.data;
};

const ReactQueryDataTransformationExample = () => {
	const results = useQuery({
		queryKey: ["posts-transform"],
		queryFn: fetchPosts,
		// to transform incoming data to your need, we can use select which gets the data as argument
		select: (data) => {
			const postTitle = data.map((post) => post.title);
			return postTitle;
		},
	});

	const { isPending, data, isError, error, isFetching, isRefetching } = results;

	// isPending to show when there is no cached data, and data is fetched
	// isFetching is true on initial fetching and background fetching
	// refetch boolean will be true on specified intervals
	console.log(isPending, isFetching, isRefetching);

	if (isError) {
		return (
			<h2 className="text-2xl font-semibold text-center">{error.message}</h2>
		);
	}
	return (
		<div className="container">
			<h2 className="text-2xl font-semibold text-center">Posts list</h2>
			{isPending ? (
				<Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto my-5" />
			) : (
				<ol className="flex flex-wrap gap-y-5 my-5 justify-between">
					{data?.map((postTitle) => (
						<li key={postTitle}>
							<Card className="w-[250px]">
								<CardHeader>
									<CardTitle className="truncate">{postTitle}</CardTitle>
								</CardHeader>
							</Card>
						</li>
					))}
				</ol>
			)}
		</div>
	);
};

export default ReactQueryDataTransformationExample;