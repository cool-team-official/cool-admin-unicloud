<template>
	<error-page :code="503" desc="马上回来"></error-page>
</template>

<script>
import ErrorPage from "@/components/error-page/index";

export default {
	components: {
		ErrorPage
	}
};
</script>
