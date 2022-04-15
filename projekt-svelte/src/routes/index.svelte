<script>
	import LadnaRamka from '$lib/LadnaRamka.svelte';
	import PostCard from '$lib/PostCard.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import {onMount} from 'svelte';
	
	const url = "https://jsonplaceholder.typicode.com/posts";
	let posts=[];
	let title="";
	let body="";

	onMount(async() => {
		await onGetPosts();
	})

	const onAddPosts = () => {
		posts = [...posts, {id: uuidv4(), title, body}];
		title="";
		body="";
	}

	const onGetPosts = async () => {
		const res = await fetch(url);
		if(res.ok) {
			posts=await res.json();
		}else{
			console.log('Fetch error!');
		}
	}

	const onRemovePost = (event) => {
		const id = event.detail;
		posts= posts.filter(item => item.id != id);
	}
</script>

<h1>
	Blog <button on:click={onGetPosts}>Get Posts</button>
</h1>


<form on:submit|preventDefault={onAddPosts}>
	<label for="title">Title: 
		<input type="text" name="title" bind:value={title}/>
	</label><br>
	<label for="title">Body: 
		<textarea type="text" name="body" bind:value={body}/>
	</label><br>
	<button>Add</button>
	<button type="reset">Reset</button>
</form>

{#each posts as post, index}
	<PostCard {...post} {index} on:remove={onRemovePost} bind:body={post.body}/>

	<LadnaRamka>{post.body}</LadnaRamka>
{/each}