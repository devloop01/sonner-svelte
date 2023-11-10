<script>
	import '@/styles/app.postcss';

	const title = 'sonner-svelte';
	const description = 'An opinionated toast component for Svelte';
	const siteUrl = 'https://sonner-svelte.vercel.app';
</script>

<svelte:head>
	<link rel="shortcut icon" href="/favicon.svg" />
	<meta name="twitter:card" content="summary_large_image" />
	<title>{description} - {title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={description} />
	<meta name="author" content="devloop01" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="https://sonner-svelte.vercel.app" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="https://sonner-svelte.vercel.app/og.png" />
	<meta name="twitter:image:alt" content={title} />
	<meta name="twitter:creator" content="devloop01" />
	<meta property="og:title" content={title} />
	<meta property="og:type" content="article" />
	<meta property="og:image" content="https://sonner-svelte.vercel.app/og.png" />
	<meta property="og:image:alt" content={title} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:locale" content="EN_US" />
	<meta property="og:url" content={siteUrl} />
</svelte:head>

<slot />
