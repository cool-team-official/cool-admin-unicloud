<template>
	<error-page :code="403" desc="您无权访问此页面"></error-page>
</template>

<script>
import ErrorPage from "@/components/error-page/index";

export default {
	components: {
		ErrorPage
	}
};
</script>
